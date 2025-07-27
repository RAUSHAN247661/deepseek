import { Webhook } from "svix";
import connectDB from "@/lib/db.js";
import User from "@/models/user";


export async function POST(req) {
    const wh  = new Webhook(process.env.SIGNING_SECRET);
    const headerPayload = await headers()
    const svixHeaders = {
        "svix-id" : headerPayload.get("svix-id"),
        "svix-timestamp" : headerPayload.get("svix-timestamp"),
        "svix-signature" : headerPayload.get("svix-signature"),
    };

    // get the payload and verify this

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const {data ,type} = wh.verify(body, svixHeaders);

    // prepare the userdata to saved in the database

    const userData = {
        _id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_addresses,
        image: data.image_url,
    };

    await connectDB();

    switch (type) {
        case "user.created":
            // create the user
            await User.create(userData);
            break;
        case "user.updated":
            // update the user
            await User.findByIdAndUpdate(data.id, userData);
            break;
        case "user.deleted":
            // delete the user
            await User.findByIdAndDelete (data.id);
            break;
        default:
            break;


    }
    
        return NextResponse.json({
            message: "Webhook received and processed successfully",
            type,
            userData,
        });
    }
