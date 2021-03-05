import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../Reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ basket,user }] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(
          value // it pass here as render prop
        ) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This Order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // The value is passed from here to
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button
        onClick={(e) =>  (user !== null ? history.push("/payment") : history.push("/login")) }
        className="btn"
        disabled={basket.length === 0}
      >
        Procced to checkout
      </button>
    </div>
  );
}

export default Subtotal;
