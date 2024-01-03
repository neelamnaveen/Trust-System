import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Modal from '@mui/joy/Modal';
import { DialogActions, DialogContent, DialogTitle, Divider, ModalDialog } from '@mui/joy';
import { Add, DeleteForever, Warning } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function LoanCreationForm() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState<boolean>(false);

    interface FormElements extends HTMLFormControlsCollection {
        date: HTMLInputElement;
        typeOfLoan: HTMLInputElement;
        place: HTMLInputElement;
        principle: HTMLInputElement;
        interest: HTMLInputElement;
        platformId: HTMLInputElement;
        status: HTMLInputElement;
    }
    interface LoanFormElement extends HTMLFormElement {
        readonly elements: FormElements;
    }

    interface ILoan { date: string; typeOfLoan: string; place: string; principle: string; interest: string; platformId: string; status: string; };

    async function handleSubmition() {
        // alert("loan request sumbitted" + JSON.stringify(data));
        try {
            let data = window.localStorage.getItem("newLoan") || "new loan not updated at client side";

            await axios.post('/loan', JSON.parse(data));
            alert("Your loan request has been submitted and pending for approval with other participant, please ask them to login into portal and approve this loan")
            navigate("/loans");

            window.localStorage.removeItem("newLoan");

        } catch (err) {
            alert(err);
            console.log(err)
            // setWarning(true);
            // setWarningMessage("Please enter correct email and password");
            // setTimeout(() => {
            //     setWarning(false);
            // }, 5000);
        }
    }

    function setDataInBrowser(newLoan: ILoan) {
        window.localStorage.setItem("newLoan", JSON.stringify(newLoan));
        setOpen(true);
    }

    return (
        <Sheet
            sx={{
                display: 'flex',
                flexFlow: 'row wordwrap',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '95vh',
            }}
        >

            <form
                onSubmit={(event: React.FormEvent<LoanFormElement>) => {
                    event.preventDefault();
                    const formElements = event.currentTarget.elements;
                    const data = {
                        date: formElements.date.value,
                        typeOfLoan: formElements.typeOfLoan.innerText,
                        place: formElements.place.value,
                        principle: formElements.principle.value,
                        interest: formElements.interest.value,
                        platformId: formElements.platformId.value,
                        status: "approvalPending",
                    };
                    //   alert(JSON.stringify(data, null, 2));
                    // handleSubmition(data)

                    setDataInBrowser(data)
                }}
            >
                <Sheet
                    sx={{
                        //   width: 300,
                        mx: 'auto',
                        my: 4,
                        py: 3,
                        px: 2,
                        display: 'flex',
                        // flexDirection: 'row',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                    className="loanForm"
                >
                    <FormControl required>
                        <FormLabel>Date</FormLabel>
                        <Input name="date" type="datetime-local" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Type Of Loan</FormLabel>
                        <Select placeholder="Choose one…" id="typeOfLoan">
                            <Option value="lending">Lending</Option>
                            <Option value="borrowing">Borrowing</Option>
                        </Select>
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Place</FormLabel>
                        <Input name="place" type="text" placeholder="place" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Principle Amount</FormLabel>
                        <Input name="principle" type="text" placeholder="principle" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Interest</FormLabel>
                        <Input name="interest" type="text" placeholder="interest" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Platform Id</FormLabel>
                        <Input name="platformId" type="text" placeholder="platformId" />
                    </FormControl>
                    <FormControl disabled>
                        <FormLabel>Status</FormLabel>
                        <Select placeholder="Approval will goes to other parties" id="status">
                            <Option value="paid">Paid</Option>
                            <Option value="approvalPending">Pending for approval</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    </FormControl>
                </Sheet>
                <Sheet
                    sx={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // minHeight: '40vh',
                    }}
                >
                    <Button
                        variant="solid"
                        color="primary"
                        startDecorator={<Add />}
                        // onClick={() => {}}
                        type="submit"
                    >
                        Secure New Loan
                    </Button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <ModalDialog variant="outlined" role="alertdialog">
                            <DialogTitle>
                                <Warning />
                                Confirmation
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                Are you sure you want to submit loan into blockchain ?
                            </DialogContent>
                            <DialogActions>
                                <Button type="submit" value="submit" variant="solid" color="danger" onClick={() => { setOpen(false); handleSubmition() }}>
                                    Continue
                                </Button>
                                <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </ModalDialog>
                    </Modal>
                </Sheet>
            </form>
        </Sheet>
    );
}