import { ListModel } from "@/backend/models/ListModel";
import { NextRequest, NextResponse } from "next/server";

export async function createList(req: NextRequest) {
  try {
    const { name, creatorEmail, items, category } = await req.json();
    const formatedItems = items.map((i: any) => {
      return { name: i, status: "incomplete" };
    });

    const newList: any = new ListModel(
      null,
      name,
      creatorEmail,
      category,
      formatedItems
    );

    const createdList: any = await newList.saveToListFirestore();

    return createdList;
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear la lista" },
      { status: 500 }
    );
  }
}

export async function getUserLists(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") as any;

    const userLists: any = await ListModel.getListsByEmail(email);

    return userLists;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al obtener las listas del usuario",
      },
      {
        status: 400,
      }
    );
  }
}

export async function getListData(id: string) {
  try {
    const listData: any = await ListModel.getListData(id);
    return listData;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al obtener la informacion de la lista",
      },
      {
        status: 400,
      }
    );
  }
}

export async function updateListItems(req: NextRequest, id: string) {
  try {
    const { itemsArr } = await req.json();
    const updateList = await ListModel.updateItems(itemsArr, id);
    return updateList;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deleteList(id: string) {
  try {
    const listDeleted: any = await ListModel.deleteList(id);
    return listDeleted;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al obtener la informacion de la lista",
      },
      {
        status: 400,
      }
    );
  }
}
