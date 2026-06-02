function DeliveryTimeline({status}) {
    const statuses = ["PENDING", "ACCEPTED", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "CANCELLED"];
    const currentIndex = statuses.indexOf(status);
  return (
    <>
        <h3><strong>Delivery Progress</strong></h3>
        {statuses.map((status, index) =>(
            <div key={status}>
                {index<=currentIndex?'✅':'⭕'}
                {status}
            </div>
        ))}
    </>
  );
}
export default DeliveryTimeline