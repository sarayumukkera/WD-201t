/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const todoList = require("../todo");

// taking elements from todoList by importing
const {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

// Test Suite collection of all tests
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    //today
    let today = new Date().toISOString().split("T")[0];

    // today plus 10 days
    let today_plus10days = new Date();
    today_plus10days.setDate(today_plus10days.getDate() + 10);
    today_plus10days = new Date(today_plus10days);
    today_plus10days = today_plus10days.toISOString().split("T")[0];

    //today minus 10 days
    let today_minus10days = new Date();
    today_minus10days.setDate(today_minus10days.getDate() - 10);
    today_minus10days = new Date(today_minus10days);
    today_minus10days = today_minus10days.toISOString().split("T")[0];

    // now we add elements into all array
    add({
      title: "DSA prep",
      completed: false,
      dueDate: today_plus10days,
    });

    add({
      title: "Complete Solidity",
      completed: false,
      dueDate: today_minus10days,
    });

    add({
      title: " Make Personal Portfolio ",
      completed: true,
      dueDate: today,
    });
    add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
  });

  // in this we test of adding new todo
  test("Should add new todo", () => {
    const todoItems_Count = all.length;

    // here we add element into all array
    add({
      title: "Test todo",
      completed: true,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(all.length).toBe(todoItems_Count + 1);
  });

  //in this we test mark a todo as complete
  test("Should mark a todo as complete", () => {
    //checking complete
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  //in this we test retrieval of overdue items
  test("checks retrieval of overdue items.", () => {
    let count_overdue = overdue().length;

    // today minus 5 days to check overdue
    let todayminus_5Days = new Date();
    todayminus_5Days.setDate(todayminus_5Days.getDate() - 5);
    todayminus_5Days = todayminus_5Days.toISOString().split("T")[0];

    //adding elements into all array
    add({
      title: "Watch Code with Harry Python Playslit",
      completed: true,
      dueDate: todayminus_5Days,
    });

    add({
      title: "Watch Harry Potter",
      completed: true,
      dueDate: todayminus_5Days,
    });

    expect(overdue().length).toBe(count_overdue + 2);
  });

  //testing of retrieval of due later items.
  test("checks retrieval of due later items.", () => {
    let count_dueLater = dueLater().length;

    // today plus 5 days to check due later
    let todayplus_5Days = new Date();
    todayplus_5Days.setDate(todayplus_5Days.getDate() + 5);
    todayplus_5Days = todayplus_5Days.toISOString().split("T")[0];

    //adding elements into all array
    add({
      title: "Clone website of Spotify ",
      completed: true,
      dueDate: todayplus_5Days,
    });

    add({
      title: " Watch Ind vs Eng Match  ",
      completed: false,
      dueDate: todayplus_5Days,
    });

    expect(dueLater().length).toBe(count_dueLater + 2);
  });

  //testing of retrieval of due today items.
  test("checks retrieval of due today items.", () => {
    let count_dueToday = dueToday().length;

    //today date in required format
    let date_today = new Date().toISOString().split("T")[0];

    //adding elements into all array
    add({
      title: "Eat Biryani",
      completed: false,
      dueDate: date_today,
    });

    add({
      title: "Complete Assignment",
      completed: true,
      dueDate: date_today,
    });

    expect(dueToday().length).toBe(count_dueToday + 2);
  });
});
