function Footer({ onOpenModal }) {
    return (
        <footer style={{ marginTop: "30px", padding: "20px", borderTop: "2px solid #ccc", textAlign: "center" }}>
            <button
                onClick={onOpenModal}
                style={{ fontSize: "24px", padding: "10px 20px", borderRadius: "50%", cursor: "pointer", backgroundColor: "#007BFF", color: "white", border: "none" }}
            >
                + Nouvelle Tâche
            </button>
        </footer>
    );
}

export default Footer;