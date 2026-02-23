import { defaultNodePosition } from "../../dummy-data/nodes-edges";
import { appStore } from "../../stores/redux-store";
import { GraphSliceActions } from "../../stores/slices/graph-slice";
import {
  DefaultNodeStyle,
  EdgeStyle1,
} from "../../assets/styles/graph-style-constants";
import { Entity, OwnerShip } from "../../types/entity-types";
import { Edge, Node } from "reactflow";

// const defaultNodePosition = { x: 0, y: 0 };

export class EntityConverter {
  static convertEntitiesToGraph(
    entities: Entity[] = appStore.getState().entity.entities,
    ownerships: OwnerShip[] = appStore.getState().entity.ownerships
  ) {
    const convertedNodes: Node[] = entities.map((entity: Entity) => {
      return {
        id: entity.entityId,
        data: {
          label: entity.entityName,
          entity: entity,
        },
        position: defaultNodePosition,
        style: DefaultNodeStyle,
      };
    });

    const convertedEdges: Edge[] = ownerships.map((ownership: OwnerShip) => {
      return {
        id: ownership.ownershipId,
        source: ownership.ownerId,
        target: ownership.ownedId,
        animated: true,
        label: `${ownership.ownershipName} ${ownership.ownershipPercentage}%`,
        data: {
          ownershipName: ownership.ownershipName,
          ownershipPercentage: ownership.ownershipPercentage,
        },
        markerEnd: EdgeStyle1.markerEnd,
        style: EdgeStyle1.edgeLineStyle,
        type: "custom", // This is the name of the custom edge
      };
    });

    // entities.forEach((entity: Entity) => {
    //   entity.ownerships.forEach((ownership: OwnerShip) => {
    //     convertedEdges.push({
    //       id: ownership.ownershipId,
    //       source: ownership.ownerId,
    //       target: ownership.ownedId,
    //       animated: true,
    //       label: `${ownership.ownershipName} ${ownership.ownershipPercentage}%`,
    //       data: {
    //         ownershipName: ownership.ownershipName,
    //         ownershipPercentage: ownership.ownershipPercentage,
    //       },
    //       // markerStart: EdgeStyle1.markerStart,
    //       markerEnd: EdgeStyle1.markerEnd,
    //       style: EdgeStyle1.style,
    //       type: "custom", // This is the name of the custom edge
    //     });
    //   });
    // });

    appStore.dispatch(
      GraphSliceActions.addNewBulkConnections({
        nodes: convertedNodes,
        edges: convertedEdges,
      })
    );

    return { convertedNodes, convertedEdges };
  }
}
