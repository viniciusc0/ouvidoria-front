import { useRouter } from "next/router";
import { Container, Icon, Wrapper } from "./styles";
import Iconify from "../iconify";

export default function BackButton(){
    const router  = useRouter();

    return (
        <Container>
            <Wrapper onClick={() => router.back()}>
            <Iconify icon="material-symbols:arrow-back-ios-new"/>
            </Wrapper>
        </Container>

    );
}