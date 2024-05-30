import { useEffect, useState } from "react";
import { Layout } from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getInvoiceByUser } from "./helpers/invoice";
import { Button, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { Invoice } from "../types";
import { AddInvoiceModal } from "./components/Modal/AddInvoiceModal";

export const InvoicePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const { user } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const fetchedInvoices = await getInvoiceByUser({
          userId: user.id,
        });
        setInvoiceList(fetchedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        // Handle error
      }
    };
    if (user) {
      fetchData();
    }
  }, []);

  return (
    <Layout>
      <div>
        <h1>📝 Invoice</h1>
        <Grid templateColumns="repeat(5, 1fr)" gap={4} padding={4}>
          {invoiceList.map((invoice) => (
            <GridItem key={invoice.id}>
              <Card key={invoice.id} width={"300px"} padding={4}>
                <h3>{invoice.title}</h3>
                <Flex gap={2}>
                  <Link to={`/invoice/${invoice.id}`}>See</Link>
                  <ViewIcon onClick={() => navigate(`/invoice/${invoice.id}`)} />
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
            user={user}
          />
        )}
      </div>
    </Layout>
  );
};
