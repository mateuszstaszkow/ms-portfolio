import { useFormik } from 'formik';

export default function ContactForm() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <div>tedst</div>
        // <form onSubmit={formik.handleSubmit} className="space-y-4">
        //     <div>
        //         <label htmlFor="name" className="block">Name</label>
        //         <input
        //             id="name"
        //             name="name"
        //             type="text"
        //             onChange={formik.handleChange}
        //             value={formik.values.name}
        //             className="w-full p-2 border border-gray-300 rounded"
        //         />
        //     </div>
        //     <div>
        //         <label htmlFor="email" className="block">Email</label>
        //         <input
        //             id="email"
        //             name="email"
        //             type="email"
        //             onChange={formik.handleChange}
        //             value={formik.values.email}
        //             className="w-full p-2 border border-gray-300 rounded"
        //         />
        //     </div>
        //     <div>
        //         <label htmlFor="message" className="block">Message</label>
        //         <textarea
        //             id="message"
        //             name="message"
        //             onChange={formik.handleChange}
        //             value={formik.values.message}
        //             className="w-full p-2 border border-gray-300 rounded"
        //         />
        //     </div>
        //     <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        // </form>
    );
}
