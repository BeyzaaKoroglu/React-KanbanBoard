# KANBAN BOARD APPLICATION

## Application Features

### Board

- Add a board
- Update board title (Only board owner)
- Delete board (Only board owner)

### Board Member

- Add a board member (Only board owner)
- Delete board member (Only board owner)

### List

- Add a list to board
- Update list title (Only board owner)
- Delete list (Only board owner)
- Drag-drop list (Only board owner)

### Card

- Add a card to list
- Update card title, description, duedata
- Delete card
- Drag-drop card

### Label

- Add a label to card
- Delete label

### Checklist

- Add a checklist to card
- Update checklist title
- Delete checklist

### Checklist Item

- Add a item to checklist
- Change boolean value of item
- Delete item

### Comment

- Add a comment to card
- Delete comment

## Project Setup

### Client Side

```sh
npm install && npm start
```

### Server Side [Github Repository](https://github.com/haandev/patika-kanban-api)

```sh
npm install
docker-compose up --build
```

### Technologies Used In The Project

- Axios
- Material UI
- React Beautiful DnD
- React Router Dom
- Styled Components
