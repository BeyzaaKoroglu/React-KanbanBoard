import React from "react";

export type ContextType = {
  state: StateType;
  addBoard: (newBoard: BoardType) => void;
  setSelectedBoard: (id: number) => void;
  updateBoard: (BoardType) => void;
  deleteBoard: (id: number) => void;
};

export type StateType = {
  boards: BoardsType;
  selectedBoard: BoardType;
};

export type BoardsType = Array<BoardType>;

export type BoardType = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  members: any;
};
