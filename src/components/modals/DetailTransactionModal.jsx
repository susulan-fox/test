import { Modal, Button, Table, Badge } from "react-bootstrap";

const DetailTransactionModal = ({ selectedCustomer, handleClose }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    Riwayat Transaksi a.n {selectedCustomer?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedCustomer && (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Kode Transaksi</th>
                                <th>Tanggal Transaksi</th>
                                <th>Jumlah</th>
                                <th>Jenis Laundry</th>
                                <th>Total Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCustomer.transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td><Badge bg="secondary">{transaction.id.slice(0, 8)}</Badge></td>
                                    <td>{formatDate(transaction.billDate)}</td>
                                    <td>
                                        {transaction.billDetails.map((item) => item.qty)}
                                        <span> </span>

                                        {transaction.billDetails.map((item) => item.product.type)}
                                    </td>
                                    <td>
                                        {transaction.billDetails.map((item) => item.product.name)}
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0,
                                        }).format(
                                            transaction.billDetails.reduce((acc, item) => acc + item.price * item.qty, 0)
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </>
    )
}

export default DetailTransactionModal