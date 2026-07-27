

export default function tableRender({children}) {

    return(
        <section>
            <div className="container">
                <li>{children.first_name}</li>
                <li>{children.last_name}</li>
                <li>{children.email}</li>
                <li>{children.gender}</li>
                <li>{children.ip_address}</li>
            </div>
        </section>
    );
}