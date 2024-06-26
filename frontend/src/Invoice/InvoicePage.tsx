import { useEffect, useState } from "react";
import { Layout } from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button, Card, Flex, Grid, GridItem } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { Invoice } from "../types";
import { AddInvoiceModal } from "./components/Modal/AddInvoiceModal";
import { getInvoiceByUser } from "./helpers/invoice";
import { InvoiceProvider } from "./helpers/hooks/useInvoice";

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
      }
    };
    if (user) {
      fetchData();
    }
  }, []);

  return (
    <Layout>
      <InvoiceProvider userId={user?.id ?? 0}>
        <h1>📝 Invoice</h1>
        <Grid gap={4} padding={4} maxWidth={"100vw"}>
          {invoiceList.map((invoice) => (
            <GridItem key={invoice.id} width={"300px"}>
              <Card key={invoice.id} width={"300px"} padding={4}>
                <h3>{invoice.title}</h3>
                <Flex gap={2}>
                  <Link to={`/invoice/${invoice.id}`}>See</Link>
                  <ViewIcon
                    onClick={() => navigate(`/invoice/${invoice.id}`)}
                  />
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
      </InvoiceProvider>
    </Layout>
  );
};
