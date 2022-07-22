/** @jsxImportSource @emotion/react */
import { useState, useMemo, useCallback, useEffect } from "react";
import { EventModule, EventPiece } from "components";
import { Col, Row, message, Card } from "antd";
import { FormValues, ModeType } from "./types";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEvent } from "hooks";

interface Props {
  eventState: FormValues[];
  setEventState: React.Dispatch<React.SetStateAction<FormValues[]>>;
}

export default function BottomSection({ eventState, setEventState }: Props) {
  const [radioTodo, setRadioTodo] = useState<string | undefined>();
  const [radioWorking, setRadioWorking] = useState<string | undefined>();
  const [radioDone, setRadioDone] = useState<string | undefined>();
  const [checkedTodo, setCheckedTodo] = useState(false);
  const [checkedWorking, setCheckedWorking] = useState(false);
  const [checkedDone, setCheckedDone] = useState(false);

  //选中全选checkbox时
  const handleDisplayAll = useEvent(
    (
      list: FormValues[],
      setList: React.Dispatch<React.SetStateAction<FormValues[]>>,
      flag: boolean,
      mode: ModeType
    ) => {
      let newList = list.map((item, index) => {
        if (item.mode === mode) {
          item.isChecked = flag;
        }
        return item;
      });
      setList(newList);
    }
  );

  //选中单选checkbox时
  const handleDisplayOne = useEvent(
    (
      list: FormValues[],
      setList: React.Dispatch<React.SetStateAction<FormValues[]>>,
      itemSelected: FormValues,
      flag: boolean
    ) => {
      let newList = list.map((item, index) => {
        if (item === itemSelected) {
          item.isChecked = flag;
        }
        return item;
      });
      setList(newList);
    }
  );

  //全选
  const handleAll = useCallback(
    (e: CheckboxChangeEvent, mode: ModeType) => {
      handleDisplayAll(eventState, setEventState, e.target.checked, mode);
      if (mode === "todo") {
        setCheckedTodo(e.target.checked);
      }
      if (mode === "working") {
        setCheckedWorking(e.target.checked);
      }
      if (mode === "done") {
        setCheckedDone(e.target.checked);
      }
    },
    [eventState, handleDisplayAll, setEventState]
  );

  //多选
  const handleOne = useCallback(
    (e: CheckboxChangeEvent, item: FormValues, mode: ModeType) => {
      handleDisplayOne(eventState, setEventState, item, e.target.checked);
    },
    [eventState, handleDisplayOne, setEventState]
  );

  const handleModeChange = useCallback(
    (mode: ModeType) => {
      switch (mode) {
        case "todo":
          if (!radioTodo) {
            message.warning("请先选择事务状态！");
          } else {
            return radioTodo;
          }
          break;
        case "working":
          if (!radioWorking) {
            message.warning("请先选择事务状态！");
          } else {
            return radioWorking;
          }
          break;
        case "done":
          if (!radioDone) {
            message.warning("请先选择事务状态！");
          } else {
            return radioDone;
          }
          break;
        default:
          break;
      }
    },
    [radioDone, radioTodo, radioWorking]
  );

  //确定
  const handleSure = useCallback(
    (mode: ModeType) => {
      if (eventState.length === 0) {
        message.warning("请先选择事务！");
        return;
      }
      let tempRadio: ModeType = handleModeChange(mode) as ModeType;
      let newList = eventState.map((item, index) => {
        if (item.mode === mode && item.isChecked) {
          item.mode = tempRadio;
          item.isChecked = false;
          console.log({ item });
        }
        return item;
      });

      console.log({ newList });
      setEventState(newList);
      setRadioTodo("");
      setRadioWorking("");
      setRadioDone("");
      setCheckedTodo(false);
      setCheckedWorking(false);
      setCheckedDone(false);
    },

    [eventState, handleModeChange, setEventState]
  );

  useEffect(() => {
    if (
      eventState.length !== 0 &&
      eventState.filter((v) => v.mode === "todo").length !== 0 &&
      eventState
        .filter((v) => v.mode === "todo")
        .every((n) => n.isChecked === true)
    ) {
      setCheckedTodo(true);
    } else {
      setCheckedTodo(false);
    }
    if (
      eventState.length !== 0 &&
      eventState.filter((v) => v.mode === "working").length !== 0 &&
      eventState
        .filter((v) => v.mode === "working")
        .every((n) => n.isChecked === true)
    ) {
      setCheckedWorking(true);
    } else {
      setCheckedWorking(false);
    }
    if (
      eventState.length !== 0 &&
      eventState.filter((v) => v.mode === "done").length !== 0 &&
      eventState
        .filter((v) => v.mode === "done")
        .every((n) => n.isChecked === true)
    ) {
      setCheckedDone(true);
    } else {
      setCheckedDone(false);
    }
  }, [eventState]);

  //删除
  const handleDelete = useCallback(
    (item: FormValues, mode: ModeType) => {
      let newList = eventState
        .filter((v) => v.mode === mode)
        .filter((n) => n !== item);
      setEventState(newList);
    },
    [eventState, setEventState]
  );

  const todoThing = useMemo(() => {
    return (
      <EventModule
        title="Todo"
        checked={checkedTodo}
        handleAll={handleAll}
        handleSure={handleSure}
        radioValue={radioTodo}
        setRadioValue={setRadioTodo}
      >
        <EventPiece
          pieceInfo={eventState}
          handleOne={handleOne}
          handleDelete={handleDelete}
          mode={"todo"}
        />
      </EventModule>
    );
  }, [
    checkedTodo,
    eventState,
    handleAll,
    handleDelete,
    handleOne,
    handleSure,
    radioTodo,
  ]);

  const WorkingThing = useMemo(() => {
    return (
      <EventModule
        title="Working"
        checked={checkedWorking}
        handleAll={handleAll}
        handleSure={handleSure}
        radioValue={radioWorking}
        setRadioValue={setRadioWorking}
      >
        <EventPiece
          // pieceInfo={workingList}
          pieceInfo={eventState}
          handleOne={handleOne}
          handleDelete={handleDelete}
          mode={"working"}
        />
      </EventModule>
    );
  }, [
    checkedWorking,
    eventState,
    handleAll,
    handleDelete,
    handleOne,
    handleSure,
    radioWorking,
  ]);

  const doneThing = useMemo(() => {
    return (
      <EventModule
        title="Done"
        checked={checkedDone}
        handleAll={handleAll}
        handleSure={handleSure}
        radioValue={radioDone}
        setRadioValue={setRadioDone}
      >
        <EventPiece
          // pieceInfo={doneList}
          pieceInfo={eventState}
          handleOne={handleOne}
          handleDelete={handleDelete}
          mode={"done"}
        />
      </EventModule>
    );
  }, [
    checkedDone,
    eventState,
    handleAll,
    handleDelete,
    handleOne,
    handleSure,
    radioDone,
  ]);

  console.log({ eventState });

  return (
    <div css={{ marginTop: 20 }}>
      <Card css={{ padding: 20 }} title="事务一览处">
        <Row gutter={8}>
          <Col span={8}>{todoThing}</Col>
          <Col span={8}>{WorkingThing}</Col>
          <Col span={8}>{doneThing}</Col>
        </Row>
      </Card>
    </div>
  );
}
