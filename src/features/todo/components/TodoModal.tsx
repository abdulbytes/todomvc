import React, { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-bootstrap/Modal";
import {
  Button,
  ModalBody,
  ModalFooter,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { Todo } from "../../../model/todo";

interface TodoModalProps {
  onHide: () => void;
  showModal: boolean;
  onSave: (todo: Todo) => void;
  currentTodo?: Todo;
}

const TodoModal: FC<TodoModalProps> = ({
  showModal,
  currentTodo,
  onSave,
  onHide,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [todoText, setTodoText] = useState("");

  const handleSubmit = () => {
    if (todoText.trim()) {
      const newTodo: Todo = {
        id: uuidv4(),
        title: todoText,
        tags: tags,
        completed: false,
      };

      onSave(newTodo);
      handleCancel();
    }
  };

  const handleUpdate = () => {
    if (currentTodo && todoText.trim()) {
      const updated: Todo = {
        id: currentTodo.id,
        title: todoText,
        tags: tags,
        completed: currentTodo.completed,
      };
      handleCancel();
      onSave(updated);
    }
  };

  const handleCancel = () => {
    onHide();
    resetFields();
  };

  const resetFields = () => {
    setTodoText("");
    setTags([]);
  };

  const handleAddTags = (values: string[]) => {
    setTags(values);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTodoText(event.target.value);
  };

  const onModalOpen = () => {
    if (currentTodo) {
      setTodoText(currentTodo.title);

      currentTodo.tags && setTags(currentTodo.tags);
    } else {
      resetFields();
    }
  };

  return (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal show={showModal} onHide={handleCancel} onShow={onModalOpen}>
        <ModalHeader closeButton closeLabel={""}>
          Add Todo
        </ModalHeader>
        <ModalBody>
          <Form id="todo-form">
            <FormGroup>
              <label htmlFor="title">Title</label>
              <FormControl
                id="title"
                placeholder="What needs to be done?"
                value={todoText}
                onChange={(e) => handleChange(e)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </FormGroup>
            <div style={{ marginTop: 10, marginBottom: 20 }}>
              <label htmlFor="tags">Tags</label>
              <div className="input-group">
                <InputTags
                  placeholder="Add space separated tags"
                  values={tags}
                  onTags={(value) => handleAddTags(value.values)}
                />
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter className="justify-content-between">
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button
            form="todo-form"
            type="submit"
            variant="primary"
            onClick={currentTodo ? handleUpdate : handleSubmit}
          >
            {currentTodo ? "Save Changes" : "Add Todo"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TodoModal;
