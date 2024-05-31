import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Heading, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Layout } from "../../../Layout";
import { deleteInvoice } from "../../helpers/invoice";
import { ItemTable } from "./ItemTable";
import { VizByInvoice } from "./vizByInvoice";
import { InvoiceProvider } from "../../helpers/hooks/useInvoice";
import { useAuth } from "../../../hooks/useAuth";

export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  return (
    <Layout>
      <InvoiceProvider userId={user?.id ?? 0}>
        <ChevronLeftIcon
          position='absolute'
          top='60px'
          left='10px'
          onClick={() => window.history.back()}
        />
        <Heading>Item Page {id}</Heading>

        <ItemTable invoiceId={Number(id)} />
        <VizByInvoice />
        <Button onClick={() => deleteInvoice(Number(id))}>
          Delete invoice
        </Button>
      </InvoiceProvider>
    </Layout>
  );
};
