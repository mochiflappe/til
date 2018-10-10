const getRanking = response => {
  const ranking = [];
  const itemLength = response.ResultSet.totalResultsReturned;
  for (let i = 0; i < itemLength; i++) {
    const item = response.ResultSet['0'].Result[i + ''];
    ranking.push({
      code: item.Code,
      name: item.Name,
      url: item.Url,
      imageUrl: item.Image.Medium
    });
  }
  return ranking
};

const initialState = {
  category: undefined,
  ranking: undefined,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_REQUEST':
      return {
        categoryId: action.payload.category,
        ranking: undefined,
        error: false
      };

    case 'RECEIVE_DATA':
      return action.payload.error
        ? {...state, error: true}
        : {
          ...state,
          ranking: getRanking(action.payload.response)
        };

    default:
      return state;
  }
}
