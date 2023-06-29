import React from 'react'

function ReportMenu({
    page,
    setPage,
}: {
    page: 'relato' | 'historico'
    setPage: React.Dispatch<React.SetStateAction<'relato' | 'historico'>>
}) {
    return (
        <div
            style={{
                display: 'flex',
                borderBottom: '2px solid #CCC',
                marginBottom: '30px',
            }}
        >
            <p
                onClick={() => setPage('relato')}
                style={{
                    position: 'relative',
                    top: '2px',
                    borderBottom: page === 'relato' ? '2px solid #226ba7' : '',
                    color: page === 'relato' ? '#226ba7' : '#a7a7a7',
                    margin: 0,
                    marginRight: '10px',
                    cursor: 'pointer',
                    transition: 'color 0.5s',
                }}
            >
                Relato
            </p>
            <p
                onClick={() => setPage('historico')}
                style={{
                    position: 'relative',
                    top: '2px',
                    margin: 0,
                    marginLeft: '10px',
                    cursor: 'pointer',
                    borderBottom: page === 'historico' ? '2px solid #226ba7' : '',
                    color: page === 'historico' ? '#226ba7' : '#a7a7a7',
                    transition: 'color 0.5s',
                }}
            >
                Chat com manifestante
            </p>
        </div>
    )
}

export default ReportMenu
