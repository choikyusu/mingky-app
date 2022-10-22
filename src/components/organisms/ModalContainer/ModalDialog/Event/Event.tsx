/* eslint-disable react/no-danger */
export function Event(props: { modalStatus: { id: any; data: any } }) {
  const { modalStatus } = props;
  return (
    <>
      <header className="dialog-header">{modalStatus.data.event.name}</header>
      <div className="dialog-body">
        <div className="reset-content">
          <div
            dangerouslySetInnerHTML={{
              __html: modalStatus.data.event.description,
            }}
          />
        </div>
      </div>
    </>
  );
}
