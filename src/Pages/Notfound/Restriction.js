import { useNavigate } from "react-router-dom"
import { PageTitle, colors } from "../../Constant"
import Button from '@mui/material/Button'


export default function Restriction() {
    const goBack = useNavigate()
    return (
        <div style={{ textAlign: "center", marginTop: '-12%', marginBottom: '15%' }}>
            <div style={{ marginBottom: '-7%' }}>
                <img src="images/denied.png" alt="Restricted" />

            </div>

            <PageTitle title='You do not have access to this page' />



            <Button variant="contained" sx={{ mt: 7, bgcolor: colors.primary }} onClick={() => goBack(-1)}>
                Go back
            </Button>
        </div>
    )
}