import { Container } from "./styles";
import { Summary } from "../Summary";
import { Transaction } from "../Transactions";

export function Dashboard() {
    return(
        <Container>
            <Summary />
            <Transaction />
        </Container>
    );
}