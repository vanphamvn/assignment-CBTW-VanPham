export const getUserByIdData = [
  {
    userId: 2,
    expected: 200,
  },
  {
    userId: "abc",
    expected: 404,
  },
  {
    userId: 999999,
    expected: 404,
  }
]