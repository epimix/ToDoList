import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { TodoForm } from "../components/TodoForm";

describe("ToDoList class", () => {

    it("exist todo field", () => {
        render(<TodoForm onSubmit={() => {}} />);

        const inputField = screen.getByTestId("todo");
        expect(inputField).toBeTruthy();
    });

    it("add task to todolist", async () => {
        const mockOnSubmit = jest.fn();

        render(<TodoForm onSubmit={mockOnSubmit} />);

        const inputField = screen.getByTestId("todo");
        const addButton = screen.getByTestId("submit");

        fireEvent.changeText(inputField, "New Task");
        fireEvent.press(addButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();

            const firstCallArg = mockOnSubmit.mock.calls[0][0];

            expect(firstCallArg).toEqual(
                expect.objectContaining({
                    todo: "New Task",
                    priority: "medium",
                    date: expect.any(String),
                })
            );
        });
    });
});
