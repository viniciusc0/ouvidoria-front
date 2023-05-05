import { useRouter } from 'next/router'
import Iconify from '../iconify'
import { Container, Wrapper } from './styles'

export default function BackButton() {
    const router = useRouter()

    return (
        <Container>
            <Wrapper onClick={() => router.back()}>
                <Iconify icon="material-symbols:arrow-back-ios-new" />
            </Wrapper>
        </Container>
    )
}
