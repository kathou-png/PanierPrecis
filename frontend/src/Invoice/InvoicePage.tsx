import { useEffect, useState } from "react";
import { Layout } from "../Layout";
import { AddInvoiceModal } from "./Modal/AddInvoiceModal";
import { Button, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Invoice } from "../types/types";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { EditInvoiceModal } from "./Modal/EditInvoiceModal";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getInvoiceByUser } from "./helpers/invoice";

export const InvoicePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const { user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedInvoices = await getInvoiceByUser({
          userId: user?.id ?? 0,
        });
        console.log(fetchedInvoices);
        setInvoiceList(fetchedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        // Handle error
      }
    };
    if (user) {
      console.log(user);
      fetchData();
      console.log(invoiceList);
    }
  }, [user]);

  return (
    <Layout>
      <div>
        <h1>📝 Invoice</h1>
        <Grid templateColumns="repeat(5, 1fr)" gap={4} padding={4}>
          {invoiceList.map((invoice) => (
            <GridItem key={invoice.id}>
              <Card key={invoice.id} width={"300px"} padding={4}>
                <h3>{invoice.name}</h3>
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
