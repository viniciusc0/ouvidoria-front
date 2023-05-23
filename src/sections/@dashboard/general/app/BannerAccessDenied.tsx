import { styled } from '@mui/material/styles'
import { Typography, Button, Container, Box } from '@mui/material'
import { PageNotFoundIllustration } from '../../../../assets'
import { m } from 'framer-motion'
import { MotionContainer, varBounce } from '../../../../components/animate'
import NextLink from 'next/link'
import Iconify from '../../../../components/Iconify'
import Image from '../../../../components/Image'

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
}))

interface BannerAccessDeniedProps {
    title: string
    description: string
}

export default function BannerAccessDenied({
    title,
    description,
}: BannerAccessDeniedProps) {
    return (
        <RootStyle>
            <Container component={MotionContainer}>
                <Box
                    sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}
                >
                    <m.div variants={varBounce().in}>
                        <Typography variant="h3" paragraph>
                            {title}
                        </Typography>
                    </m.div>
                    {description && (
                        <Typography sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography>
                    )}

                    <m.div variants={varBounce().in}>
                        <Image
                            sx={{ height: 360, my: { xs: 5, sm: 10 } }}
                            disabledEffect
                            src={'/images/erro403.svg'}
                        />
                    </m.div>
                    <NextLink href="/app/home" passHref>
                        <Button size="large" variant="contained">
                            <Iconify icon={'ant-design:home-outlined'} />
                            &nbsp;Início
                        </Button>
                    </NextLink>
                </Box>
            </Container>
        </RootStyle>
    )
}
