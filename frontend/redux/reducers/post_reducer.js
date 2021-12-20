const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "Leo",
      },
      content: "첫 번째 포스트 #해시태그#리액트#리덕스",
      Images: [
        {
          src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
          src: "https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
        },
        {
          src: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
        },
      ],
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
