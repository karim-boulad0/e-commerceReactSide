const notificationItems =
  isGet &&
  notifications.slice(0, 10).map((notification) => (
    <Dropdown.Item
      key={notification.id}
      className="p-0 text-black"
      style={{
        borderBottom: "2px solid white",
        borderRadius: "5px",
      }}
    >
      {notification.read_at === null ? (
        <Link onClick={() => markAsReadById(notification.id)}>
          <div
            className={`bg-${
              notification.read_at ? "success" : "primary"
            } px-3 text-white w-100 m-0`}
          >
            <span className="m-0">
              <span style={{ fontWeight: "bold", color: "black" }}>
                {notification.data.client[0].name}{" "}
                {notification.data.client[0].user_details.last_name}
              </span>
            </span>
            <br />
            <span>new order</span>
            <span>{formatTimeAgo(notification.created_at)}</span>
          </div>
        </Link>
      ) : (
        <Link to={`notifications/${notification.id}`}>
          <div className="bg-success px-3 text-white w-100 m-0">
            <span className="m-0">
              <span style={{ fontWeight: "bold", color: "black" }}>
                {notification.data.client[0].name}
              </span>
            </span>
            <br />
            <span>{formatTimeAgo(notification.created_at)}</span>
          </div>
        </Link>
      )}
    </Dropdown.Item>
  ));