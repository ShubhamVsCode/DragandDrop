import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 } from "uuid";

const App = () => {
  const components = [
    {
      id: v4(),
      component: <App1 />
    },
    {
      id: v4(),
      component: <App2 />
    },
    {
      id: v4(),
      component: <App3 />
    },
    {
      id: v4(),
      component: <App4 />
    },
    {
      id: v4(),
      component: <App5 />
    }
  ];

  const [appOrder, setAppOrder] = useState(components);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setAppOrder((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={appOrder}
          strategy={verticalListSortingStrategy}
        >
          {/* We need components that use the useSortable hook */}
          {appOrder.map((item, i) => (
            <SortableItem
              key={item.id}
              id={item.id}
              component={item.component}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default App;

const App1 = () => {
  return <h1>Comp1</h1>;
};

const App2 = () => {
  const hanldeClick = () => {
    console.log("Hello");
  };

  return (
    <div>
      <h1>Comp2</h1>
      <button onClick={hanldeClick}>Add</button>
    </div>
  );
};

const App3 = () => {
  return <h1>Comp3</h1>;
};

const App4 = () => {
  return <h1>Comp4</h1>;
};

const App5 = () => {
  return <h1>Comp5</h1>;
};
export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid #000032",
    margin: "15px",
    padding: "15px",
    borderRadius: "5px"
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.component}
    </div>
  );
}
