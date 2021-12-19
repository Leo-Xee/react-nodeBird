const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "Leo",
      },
      content: "첫 번째 포스트 #해시태그#리액트#리덕스",
      Images: [{}],
      Comments: [
        {
          User: {
            nickname: "다현",
          },
          content: "멋있어요",
        },
        {
          User: {
            nickname: "다현",
          },
          content: "멋있어요",
        },
      ],
    },
  ],
  imagePaths: [],
  isPostAdded: false,
};

const dummyPost = {
  id: 2,
  User: { id: 2, nickname: "Con" },
  content: "Con의 포스트",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        isPostAdded: true,
      };
    default:
      return state;
  }
};

export default postReducer;
