import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Header, Form, Message } from "semantic-ui-react";
import {
  createSaleAction,
  getActivatedSaleAction,
  stopSaleAction,
} from "../actions/salesActions";

const AppModel = ({ isModelOpen, setIsModelOpen, sale }) => {
  const [saleInfo, setSaleInfo] = useState({
    saleName: "",
    discountPrecentage: "",
  });

  const hadleSaleFormChange = (e) => {
    const { name, value } = e.target;
    setSaleInfo({
      ...saleInfo,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const {
    sale: sartSaleMessage,
    loading: startSaleLoading,
    success: startSaleSuccess,
  } = useSelector((state) => state.startSale);

  const { sale: endSaleMessage, success: stopSaleSuccess } = useSelector(
    (state) => state.stopSale
  );

  const stopRunningSale = async () => {
    dispatch(stopSaleAction(sale));
  };

  const createSale = async () => {
    dispatch(createSaleAction(saleInfo));

    if (startSaleSuccess) {
      dispatch({
        type: "START_SALE_RESET",
      });

      dispatch(getActivatedSaleAction());
      setIsModelOpen(false);
    }
  };

  useEffect(() => {
    if (startSaleSuccess) {
      dispatch({
        type: "START_SALE_RESET",
      });

      dispatch(getActivatedSaleAction());
      setIsModelOpen(false);
    }

    console.log("Start sale use effect");
  }, [startSaleSuccess, dispatch, setIsModelOpen]);

  useEffect(() => {
    if (stopSaleSuccess) {
      dispatch({
        type: "STOP_SALE_RESET",
      });

      dispatch(getActivatedSaleAction());
      setIsModelOpen(false);
    }
  }, [stopSaleSuccess, dispatch, setIsModelOpen]);

  return (
    <Modal open={isModelOpen}>
      <Modal.Header>Manage Sales</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          {sale ? (
            <>
              <Header>{sale.saleName} sale is currently running</Header>

              <p> Sale Name: {sale.saleName}</p>
              <p> Discount Precentage: {sale.discountPrecentage} %</p>
              <p> Created Date: {sale.createdAt.substring(0, 10)} </p>

              {endSaleMessage && (
                <Message color="orange"> {endSaleMessage} </Message>
              )}
            </>
          ) : (
            <>
              <Header>Create Sale</Header>
              <Form>
                <Form.Field>
                  <label>Sale Name</label>
                  <input
                    placeholder="Sale Name"
                    onChange={hadleSaleFormChange}
                    value={saleInfo.saleName}
                    name="saleName"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Discount Precentage</label>
                  <input
                    placeholder="Discount Precentage"
                    type="number"
                    value={saleInfo.discountPrecentage}
                    onChange={hadleSaleFormChange}
                    name="discountPrecentage"
                  />
                </Form.Field>
              </Form>
              {sartSaleMessage && (
                <Message color="orange"> {sartSaleMessage} </Message>
              )}
            </>
          )}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsModelOpen(false)}>
          Close
        </Button>
        {sale && (
          <Button color="black" onClick={stopRunningSale}>
            Stop Currently Running Sale
          </Button>
        )}
        {!sale && (
          <Button
            content="Create Sale"
            labelPosition="right"
            icon="checkmark"
            onClick={createSale}
            loading={startSaleLoading}
            positive
          />
        )}
      </Modal.Actions>
    </Modal>
  );
};

export default AppModel;
