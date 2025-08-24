import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";

export const runtime = "nodejs";

// api endpoint to get all blogs
export async function GET(request) {
  console.log("blog get hit");
  await ConnectDB();   // ✅ pehle DB connect

  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// api endpoint for uploading blogs
export async function POST(request) {
  try {
    await ConnectDB();   // ✅ pehle DB connect

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    if (!image) {
      return NextResponse.json(
        { success: false, msg: "No image provided" },
        { status: 400 }
      );
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    console.log(imgUrl);

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);
    console.log("Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  await ConnectDB();   // ✅ pehle DB connect

  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}
