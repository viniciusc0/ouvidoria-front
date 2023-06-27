import React from 'react'
import ComplaintHistoryCard from '../ouvidoria/ComplaintHistoryCard'
import { Typography } from '@mui/material'
import { IPostHistory } from 'types/IPostHistory'

const history = [
    {
        createdAt: '2023-06-12',
        user: {
            fullname: 'Caio Simões',
        },
        comment:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas rerum iure tempora possimus nostrum tempore quod dolorem distinctio necessitatibus! Tenetur aliquam nulla nam quo odit cum, ab sit repellat veritatis.',
    },
    {
        createdAt: '2023-06-15',
        user: {
            fullname: 'Bono Vox',
        },
        comment:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas rerum iure tempora possimus nostrum tempore quod dolorem distinctio necessitatibus! Tenetur aliquam nulla nam quo odit cum, ab sit repellat veritatis.',
    },
    {
        createdAt: '2023-06-15',
        user: {
            fullname: 'The Edge',
        },
        comment:
            'Delay colcheia pontuada 8th, sit amet consectetur adipisicing elit. Voluptas rerum iure tempora possimus nostrum tempore quod dolorem distinctio necessitatibus! Tenetur aliquam nulla nam quo odit cum, ab sit repellat veritatis.',
    },
]

function ReportHistory({ histories }: { histories: IPostHistory[] }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
            }}
        >
            {(histories &&
                histories.length > 0 &&
                histories.map((post, index) => (
                    <ComplaintHistoryCard
                        key={index}
                        date={post.createdAt}
                        name={post.user.fullname}
                        comment={post.comment}
                        lightShadow
                        biggerPadding
                    />
                ))) || (
                <Typography variant="body1" textAlign={'center'} fontWeight={600}>
                    Ainda não existe histórico para exibir
                </Typography>
            )}
        </div>
    )
}

export default ReportHistory
