// Importa el modelo y otras dependencias según sea necesario
import { ListModel } from "@/backend/models/ListModel";
import { NextRequest, NextResponse } from "next/server";

// Función para crear una nueva lista
export async function createList(req: NextRequest) {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { name, creatorEmail, items, category } = await req.json();
    const formatedItems = items.map((i: any) => {
      return { name: i, status: "incomplete" };
    });

    // Crea una nueva instancia de ListModel
    const newList: any = new ListModel(
      null,
      name,
      creatorEmail,
      category,
      formatedItems
    );

    // Guarda la nueva lista en la base de datos
    const createdList: any = await newList.saveToListFirestore();

    // Devuelve una respuesta con la lista recién creada
    return createdList;
  } catch (error) {
    // Devuelve una respuesta de error en caso de problemas
    return NextResponse.json(
      { error: "Error al crear la lista" },
      { status: 500 }
    );
  }
}

export async function getUserLists(req: NextRequest) {
  try {
    // Paso 1: Obtener el correo electrónico del cuerpo de la solicitud
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") as any;

    // Paso 2: Obtener las listas del usuario utilizando el modelo ListModel
    const userLists: any = await ListModel.getListsByEmail(email);

    // Paso 3: Devolver las listas como respuesta JSON con estado 200 (Éxito)
    return userLists;
  } catch (error) {
    // Manejar errores y devolver un mensaje de error con estado 400 (Solicitud incorrecta)
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

//obtener la informacion de una lista en particular
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

//funcion a completar la idea es que en el request viajen los indices de los items a los que hay que cambiarle el status
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
//para eliminar una lista
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
