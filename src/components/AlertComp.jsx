import React from 'react'
import { useContext } from 'react'
import AlertContext from '../contexts/alerts/AlertContext'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const AlertComp = () => {
    const context = useContext(AlertContext)
    const { alert } = context
    return (

        <>
            <div style={{ height: '50px' }}>
                {
                    alert &&

                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity={alert.type}>
                            {alert.msg}
                        </Alert>
                    </Stack>
                }
            </div>
        </>

    )
}

export default AlertComp
