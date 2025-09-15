import { FormBuilder, Formio } from "formiojs";
import { useEffect, useRef } from "react";

const FormBuild = ({schema,setSchema}) => {

    const builderRef = useRef()

    useEffect(() => {
        if (builderRef.current) {
            Formio.builder(builderRef.current, schema).then((builder) => {
                console.log("Builder ready:", builder);

                const updateSchema = () => {
                    setSchema({ ...builder.schema });
                    console.log("Updated schema:", builder.schema);
                };

                builder.on("change", updateSchema);

                // initial schema
                updateSchema();
            });
        }
    }, []);
    return (
        <div ref={builderRef}></div>
    )
}

export default FormBuild;