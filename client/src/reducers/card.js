import produce from 'immer';

const initialized = {
  mainCards: [],
  myCards: [],
  isLoadCards: false,
  isLoadMyCards: false,
  isDetail: null,
  isEditCard: null,
  selectedCardsId: [],
  isSelectAll: false,
};

export const LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS';
export const LOAD_MY_CARDS_SUCCESS = 'LOAD_MY_CARDS_SUCCESS';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const SHARE_CARD_SUCCESS = 'SHARE_CARD_SUCCESS';
export const SHARED_CARDS_SUCCESS = 'SHARED_CARDS_SUCCESS';
export const OPEN_CARD_DETAIL = 'OPEN_CARD_DETAIL';
export const CLOSE_CARD_DETAIL = 'CLOSE_CARD_DETAIL';
export const LIKE_CARD_SUCCESS = 'LIKE_CARD_SUCCESS';
export const UNLIKE_CARD_SUCCESS = 'UNLIKE_CARD_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const SELECT_ALL_CARDS = 'SELECT_ALL_CARDS';
export const UNSELECT_ALL_CARDS = 'UNSELECT_ALL_CARDS';
export const SELECT_CARD = 'SELECT_CARD';
export const UNSELECT_CARD = 'UNSELECT_CARD';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';

export const OPEN_EDIT_CARD_FORM = 'OPEN_EDIT_CARD_FORM';
export const CLOSE_EDIT_CARD_FORM = 'CLOSE_EDIT_CARD_FORM';
export const EDIT_CARD_SUCCESS = 'EDIT_CARD_SUCCESS';

const reducer = (state = initialized, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_CARDS_SUCCESS:
        draft.mainCards = draft.mainCards.concat(...action.data);
        draft.isLoadCards = true;
        break;
      case ADD_CARD_SUCCESS:
        draft.myCards = [action.data, ...draft.myCards];
        draft.mainCards = [action.data, ...draft.mainCards];
        break;
      case OPEN_CARD_DETAIL:
        draft.isDetail = action.data;
        break;
      case CLOSE_CARD_DETAIL:
        draft.isDetail = null;
        break;
      case LIKE_CARD_SUCCESS: {
        const card = draft.mainCards.find((v) => v.id === action.data.CardId);
        card.Likers.push(action.data.UserId);
        break;
      }
      case UNLIKE_CARD_SUCCESS: {
        const card = draft.mainCards.find((v) => v.id === action.data.CardId);
        card.Likers = card.Likers.filter((v) => v.id !== action.data.UserId);
        break;
      }
      case LOAD_MY_CARDS_SUCCESS:
        draft.myCards = draft.myCards.concat(...action.data);
        draft.isLoadMyCards = true;
        break;
      case DELETE_USER_SUCCESS:
        draft.mainCards = draft.mainCards.filter(
          (card) => card.userId !== action.data.userId,
        );
        break;
      case SELECT_ALL_CARDS:
        draft.isSelectAll = true;
        draft.selectedCardsId = [...action.data];
        break;
      case UNSELECT_ALL_CARDS:
        draft.isSelectAll = false;
        draft.selectedCardsId = [];
        break;
      case SELECT_CARD:
        draft.selectedCardsId.push(action.data);
        break;
      case UNSELECT_CARD:
        draft.isSelectAll = false;
        draft.selectedCardsId = draft.selectedCardsId.filter(
          (id) => id !== action.data,
        );
        break;
      case DELETE_CARD_SUCCESS:
        // 카드 삭제 기능 : 마이 카드 & 메인카드에서 해당 유저가 작성한 카드를 삭제해야함
        draft.myCards = draft.myCards.filter((card) => card.id !== action.data);
        draft.mainCards = draft.mainCards.filter(
          (card) => card.id !== action.data,
        );
        break;
      case OPEN_EDIT_CARD_FORM:
        draft.isEditCard = action.data;
        break;
      case CLOSE_EDIT_CARD_FORM:
        draft.isEditCard = null;
        break;
      case EDIT_CARD_SUCCESS:
        draft.mainCards = draft.mainCards.map((card) => {
          if (card.id === action.data.cardId) {
            const editCard = {
              ...card,
              ...action.data,
            };
            return editCard;
          }
          return card;
        });
        draft.myCards = draft.myCards.map((card) => {
          if (card.id === action.data.cardId) {
            const editCard = {
              ...card,
              ...action.data,
            };
            return editCard;
          }
          return card;
        });
        draft.isEditCard = null;
        break;
      default:
        break;
    }
  });

export default reducer;
