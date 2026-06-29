let orderNumber = 3;

document.getElementById("saveOrderBtn").addEventListener("click", function () {

    const customer = document.getElementById("customerName").value.trim();
    const platform = document.getElementById("platform").value;
    const product = document.getElementById("product").value.trim();
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const status = document.getElementById("status").value;

    if (
        customer === "" ||
        product === "" ||
        quantity === "" ||
        price === ""
    ) {
        alert("Please complete all required fields.");
        return;
    }

    const table = document.getElementById("ordersTable");

    const row = table.insertRow();

    row.innerHTML = `
        <td>ORD-${String(orderNumber).padStart(4, "0")}</td>
        <td>${customer}</td>
        <td>${platform}</td>
        <td>${quantity} ${product}</td>
        <td>₱${price}</td>
        <td><span class="badge bg-warning">${status}</span></td>
       <td>
    <button
        class="btn btn-primary btn-sm"
        onclick="viewOrder(this)">
        View
    </button>
</td>
    `;

    orderNumber++;

    document.getElementById("customerName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("notes").value = "";

    const modal =
        bootstrap.Modal.getInstance(document.getElementById("newOrderModal"));

    modal.hide();

    alert("Order saved successfully!");
});
