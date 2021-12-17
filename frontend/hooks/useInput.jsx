import React, { useCallback, useState } from "react";

function useInput(initalForm) {
  const [form, setForm] = useState(initalForm);

  const onChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setForm((form) => ({ ...form, [id]: value }));
      console.log(form);
    },
    [form],
  );

  return [form, onChange];
}

export default useInput;
