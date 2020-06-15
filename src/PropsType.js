// @flow

type OnChangeEventType = {
  target : {
    name : string,
    value : number,
  },
};

export type PropsType = {
  aroundCurrent : number,
  atBeginEnd : number,
  disabled? : ?boolean,
  name : string,
  onChange? : ?( OnChangeEventType => any ),
  readOnly? : ?boolean,
  showFirstLast : boolean,
  showPrevNext : boolean,
  totalPages : number,
  value : number,
};
