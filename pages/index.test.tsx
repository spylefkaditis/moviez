import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import * as moviesHook from "../hooks/useMoviesBallot";
import App from "../pages/index";

const mockData = {
  items: [
    {
      id: "best-picture",
      items: [
        {
          title: "Nomadland",
          photoUrL:
            "https://variety.com/wp-content/uploads/2020/12/nomadland_ver2.jpg",
          id: "nomadland",
        },
        {
          title: "The Trial of the Chicago 7",
          photoUrL:
            "https://variety.com/wp-content/uploads/2020/12/trial_of_the_chicago_seven.jpg",
          id: "the-trial-of-the-chicago-7",
        },
      ],
      title: "Best Picture",
    },
    {
      id: "best-director",
      items: [
        {
          title: "Chloé Zhao for Nomadland",
          photoUrL:
            "https://variety.com/wp-content/uploads/2020/12/nomadland_ver2.jpg",
          id: "chloe-zhao",
        },
        {
          title: "Aaron Sorkin for The Trial of the Chicago 7",
          photoUrL:
            "https://variety.com/wp-content/uploads/2020/12/trial_of_the_chicago_seven.jpg",
          id: "aaron-sorkin",
        },
      ],
      title: "Best Director",
    },
    {
      id: "best-actor",
      items: [
        {
          title: "Chadwick Boseman for Ma Rainey's Black Bottom",
          photoUrL:
            "https://variety.com/wp-content/uploads/2020/12/ma_raineys_black_bottom_ver2.jpg",
          id: "chadwick-boseman",
        },
        {
          title: "Anthony Hopkins for The Father",
          photoUrL:
            "https://variety.com/wp-content/uploads/2020/12/father_ver3.jpg",
          id: "anthony-hopkins",
        },
      ],
      title: "Best Actor",
    },
  ],
};

describe("App", () => {
  describe("When failing to fetch the data", () => {
    const errorMessage = "Something went wrong";
    beforeEach(() => {
      jest.spyOn(moviesHook, "useMoviesBallot").mockImplementation(() => ({
        error: errorMessage,
        data: null,
        loading: false,
      }));

      render(<App />);
    });

    it("should render the error message", () => {
      const heading = screen.getByText(errorMessage);

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When loading data", () => {
    beforeEach(() => {
      jest.spyOn(moviesHook, "useMoviesBallot").mockImplementation(() => ({
        error: null,
        data: null,
        loading: true,
      }));

      render(<App />);
    });

    it("should render a heading", () => {
      const heading = screen.getByText("Awards 2021");

      expect(heading).toBeInTheDocument();
    });

    it("should render the loading text", () => {
      const loadingText = screen.getByText("Loading Movie Choices");

      expect(loadingText).toBeInTheDocument();
    });
  });

  describe("When the data has loaded", () => {
    let tree: RenderResult;

    beforeEach(() => {
      jest.spyOn(moviesHook, "useMoviesBallot").mockImplementation(() => ({
        error: null,
        data: mockData,
        loading: false,
      }));

      tree = render(<App />);
    });

    it("should render the category headings", () => {
      mockData.items.forEach((item) => {
        const categoryName = screen.getByText(item.title);
        expect(categoryName).toBeInTheDocument();
      });
    });

    it("should render the nominee names", () => {
      mockData.items.forEach((item) => {
        item.items.forEach((choice) => {
          const nomineeName = screen.getByText(choice.title);
          expect(nomineeName).toBeInTheDocument();
        });
      });
    });

    it("should render the nominee images", () => {
      mockData.items.forEach((item) => {
        item.items.forEach((choice) => {
          const image = screen.getByAltText(`An image of ${choice.title}`);
          expect(image).toBeInTheDocument();
        });
      });
    });

    it("should render the voting buttons", () => {
      const buttons = screen.getAllByRole("button", { name: "Select" });
      expect(buttons).toHaveLength(6);
    });

    it("should render the submit button", () => {
      const buttons = screen.getByText("Submit Votes");
      expect(buttons).toBeInTheDocument();
    });
  });

  describe("When the votes are submitted", () => {
    beforeEach(() => {
      jest.spyOn(moviesHook, "useMoviesBallot").mockImplementation(() => ({
        error: null,
        data: mockData,
        loading: false,
      }));

      render(<App />);
    });

    it("should display the modal", () => {
      const button = screen.getByRole("button", { name: "Submit Votes" });
      fireEvent.click(button);

      const modal = screen.getByRole("dialog");
      expect(modal).toBeInTheDocument();
    });

    it("should dismiss the modal when pressing the close button", () => {
      const submitButton = screen.getByRole("button", { name: "Submit Votes" });
      fireEvent.click(submitButton);

      const modal = screen.getByRole("dialog");
      const closeButton = screen.getByRole("button", { name: "X" });

      fireEvent.click(closeButton);
      expect(modal).not.toBeInTheDocument();
    });
  });
});
