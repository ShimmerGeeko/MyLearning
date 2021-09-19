import React from 'react';


// first, define a helper for combining refs
function useCombinedRefs(...refs) {
    const targetRef = React.useRef();
  
    React.useEffect(() => {
      refs.forEach(ref => {
        if (!ref) return;
  
        if (typeof ref === "function") {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      });
    }, [refs]);
  
    return targetRef;
  }
  
  // then our component
  const CombinedRefCheckbox = React.forwardRef(
    ({ label, name, value, onChange, defaultChecked, ...rest }, forwardedRef) => {
      const [checked, setChecked] = React.useState(defaultChecked || false);
  
      const innerRef = React.useRef(null);
      const combinedRef = useCombinedRefs(forwardedRef, innerRef);
  
      const setCheckedInput = checked => {
        if (innerRef.current.checked !== checked) {
          // just emulate an actual click on the input element
          innerRef.current.click();
        }
      };
  
      React.useEffect(() => {
        setCheckedInput(checked);
        if (onChange) {
          onChange(checked);
        }
      }, [checked]);
  
      return (
        <div onClick={() => setChecked(!checked)} style={{ cursor: "pointer" }}>
          <input
            style={{ display: "none" }}
            ref={combinedRef}
            type="checkbox"
            name={name}
            value={value}
            defaultChecked={checked}
            onChange={e => {
              setChecked(e.target.checked);
            }}
          />
          [{checked ? "X" : " "}]{label}
        </div>
      );
    }
  );