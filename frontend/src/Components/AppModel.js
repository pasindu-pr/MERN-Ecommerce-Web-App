import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Header, Form, Message } from "semantic-ui-react";

const AppModel = ({ isModelOpen, setIsModelOpen, sale }) => {
  const [message, setMessage] = useState(null);
  const [saleCreating, setSaleCreating] = useState(false);

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

  const user = JSON.parse(localStorage.getItem("logged-user"));

  const configuration = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const stopRunningSale = async () => {
    console.log(configuration);
    try {
      const { data } = await axios.put(
        `/api/sales/`,
        { saleId: sale._id },
        configuration
      );
      setMessage(data.message);
    } catch (error) {
      alert(error);
    }
  };

  const createSale = async () => {
    setSaleCreating(true);
    try {
      const { data } = await axios.post(
        `/api/sales/`,
        {
          saleName: saleInfo.saleName,
          discountPrecentage: saleInfo.discountPrecentage,
        },
        configuration
      );

      setMessage(data.message);
    } catch (error) {
      console.log(error);
      alert(error);
    }

    setSaleCreating(false);
  };

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

              {message && <Message color="orange"> {message} </Message>}
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
              {message && <Message color="orange"> {message} </Message>}
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
            loading={saleCreating}
            positive
          />
        )}
      </Modal.Actions>
    </Modal>
  );
};

export default AppModel;
