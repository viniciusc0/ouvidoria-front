import { Box, Button, Card, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useRouter } from 'next/router'
import { PlanFreeIcon } from 'src/assets'
import { PATH_DASHBOARD } from 'src/routes/paths'

const RootStyle = styled(Card)(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
        padding: theme.spacing(5),
    },
}))

type Props = {
    product: any
    key: any
}

export default function ProductCard({ product, key }: Props) {
    const router = useRouter()

    const onClick = (productKey: string) => {
        router.push(`${PATH_DASHBOARD.myoffers}?key=${productKey}`, '', {
            shallow: true,
        })
    }

    return (
        <RootStyle>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                {product.name}
            </Typography>

            <Typography
                variant="caption"
                sx={{
                    color: 'primary.main',
                    textTransform: 'capitalize',
                }}
            >
                {product.description || 'subTitulo'}
            </Typography>

            <Box sx={{ width: 80, height: 80, mt: 3 }}>
                <PlanFreeIcon />
            </Box>

            <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={() => {
                    onClick(product.key)
                }}
            >
                Ver Ofertas
            </Button>
        </RootStyle>
    )
}
