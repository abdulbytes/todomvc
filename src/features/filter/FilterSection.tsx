import { useDispatch } from "react-redux";
import classNames from "classnames";
import { useAppSelector } from "../../app/hooks";
import {
  selectCompletedTodos,
  selectNotCompletedTodos,
} from "../todo/store/todoSelectors";
import { filterSelected, selectFilter } from "./store/filterSlice";
import { FilterEnum } from "../../model/filter";
import { completedTodosCleared } from "../todo/store/todoSlice";

const filterLabels = [FilterEnum.ALL, FilterEnum.ACTIVE, FilterEnum.COMPLETED];

const FilterSection = () => {
  const dispatch = useDispatch();

  const completedCount = useAppSelector(
    (state: any) => selectCompletedTodos(state).length
  );

  const notCompletedCount = useAppSelector(
    (state: any) => selectNotCompletedTodos(state).length
  );

  const filter = useAppSelector((state) => selectFilter(state));

  const clearCompleted = () => dispatch(completedTodosCleared());

  const handleFilter = (filterText: FilterEnum) =>
    dispatch(filterSelected(filterText));

  return (
    <footer className="footer" style={{ height: 50 }}>
      <span className="todo-count">
        <strong>{notCompletedCount}</strong>
        <span> {notCompletedCount === 1 ? "Item" : "Items"} left</span>
      </span>
      <ul className="filters">
        {filterLabels.map((filterLabel) => (
          <li key={filterLabel}>
            <a
              href="./#"
              className={classNames({ selected: filterLabel === filter })}
              onClick={() => handleFilter(filterLabel)}
            >
              {filterLabel}
            </a>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default FilterSection;
