const ATLAS_IDENTITY = "atlasIdentity";

const getAtlasIdentity = () => {
  const atlasIdentity = localStorage.getItem(ATLAS_IDENTITY);
  /**
   * 
  {
    "atlasId": "6d3d44f7-abcc-4835-ac1e-9c16e9616482",
    "companyId": "25cdbf34-3d0c-4e2e-800c-c94403f8d54b",
    "createdAt": 1692209168970,
    "email": "charlie@atlas.testinator.com",
    "isVisitor": false,
    "name": "Charlie Testinator",
    "userId": "15",
    "fields": null,
    "customFields": {},
    "phoneNumber": null,
    "account": null,
    "appId": "4lyu8tx6nr",
    "version": 5
  }
   */
  if (atlasIdentity) {
    const { atlasId, isVisitor, email, userId, appId } = JSON.parse(atlasIdentity);
    return { atlasId, isVisitor, email, userId, appId };
  }

  return {
    atlasId: null,
    isVisitor: true,
    email: null,
    userId: null,
    appId: null,
  };
};

export default getAtlasIdentity;
