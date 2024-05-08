import { useState } from "react";
import { Layout } from "../Layout";
import { AddInvoiceModal } from "./Modal/AddInvoiceModal";
import { Button, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Invoice } from "./types";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { EditInvoiceModal } from "./Modal/EditInvoiceModal";
import { Link, useNavigate } from "react-router-dom";

const invoiceList: Invoice[] = [
  {
    id: "1",
    name: "Invoice 1",
    date: new Date(),
    marketPlace: "MarketPlace 1",
  },
  {
    id: "2",
    name: "Invoice 2",
    date: new Date(),
    marketPlace: "MarketPlace 2",
  },
];
export const InvoicePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <h1>📝 Invoice</h1>
        <Grid templateColumns="repeat(5, 1fr)" gap={4} padding={4}>
          {invoiceList.map((invoice) => (
            <GridItem>
              <Card key={invoice.id} width={"300px"} padding={4}>
                <h3>{invoice.name}</h3>
                <p>{invoice.date.toLocaleDateString()}</p>
                <p>{invoice.marketPlace}</p>
                <Flex gap={2}>
                  <Link to={`/invoice/${invoice.id}`}>See</Link>
                  <EditIcon
                    onClick={() => {
                      setShowEditModal(true);
                    }}
                  />
                  <ViewIcon onClick={() => navigate(`/byId/${invoice.id}`)} />
                </Flex>
              </Card>
            </GridItem>
          ))}
        </Grid>
        <Button onClick={() => setShowAddModal(true)}>
          <>Add Invoice</>
        </Button>
        {showAddModal && (
          <AddInvoiceModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
          />
        )}
        {showEditModal && (
          <EditInvoiceModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};
