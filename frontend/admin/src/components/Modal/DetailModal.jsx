import React from "react";
import ReactDOM from "react-dom";
import "./DetailModal.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Typography, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyle = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5)
    }
}))

const DetailModal = ({title, children, openPopup, setOpenPopup}) => {
    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {/* Chi tiết đơn hàng */}
                    </Typography>
                    <button onClick={()=> {setOpenPopup(false)}}  style={{color: red}}>X</button>
                </div>
                
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>
            
        </Dialog>
        
    )
}

export default DetailModal;
