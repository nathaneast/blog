import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { SEARCH_REQUEST } from "../../redux/types";
import { Form, Input } from "reactstrap";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({ searchBy: "" });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { searchBy } = form;

    dispatch({
      type: SEARCH_REQUEST,
      payload: searchBy,
    });

    console.log(searchBy, "Submit Body");
    resetValue.current.value = "";
  };
  const resetValue = useRef(null);

  return (
    <>
      <Form onSubmit={onSubmit} className="col mt-2">
        <Input name="searchBy" onChange={onChange} innerRef={resetValue} />
      </Form>
    </>
  );
};

export default SearchInput;
