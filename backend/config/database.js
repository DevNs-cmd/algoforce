import { MongoClient } from "mongodb";
let db;
let client;

export const connectDB = async () => {
  // Check for both MONGODB_URI and MONGO_URI for compatibility
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is missing from environment variables!");
    console.log("Setting up default MongoDB connection string for local development...");
    // Provide a default for local development if neither is set
    const defaultUri = "mongodb://localhost:27017/algoforce";
    console.log(`Using default URI: ${defaultUri}`);
    try {
      const { MongoClient } = await import("mongodb");
      const defaultClient = new MongoClient(defaultUri);
      await defaultClient.connect();
      db = defaultClient.db("algoforce");
      console.log("✅ MongoDB Connected (Local Development)");
      client = defaultClient;
      return;
    } catch (error) {
      console.error("❌ Failed to connect to default MongoDB:", error.message);
      console.log("⚠️  Using in-memory storage for development. Data will be lost when server stops.");
      
      // Create a simple in-memory database for development
      const collections = new Map();
      
      db = {
        collection: (name) => {
          if (!collections.has(name)) {
            collections.set(name, []);
          }
          
          return {
            find: (query = {}) => {
              let results = collections.get(name);
              
              // Simple query matching
              if (Object.keys(query).length > 0) {
                results = results.filter(doc => {
                  return Object.entries(query).every(([key, value]) => {
                    if (key === '$or') {
                      // Handle $or queries
                      return value.some(orCondition => {
                        return Object.entries(orCondition).every(([orKey, orValue]) => {
                          if (orKey === 'phone' || orKey === 'email') {
                            return doc[orKey] === orValue;
                          }
                          return doc[orKey] === orValue;
                        });
                      });
                    }
                    return doc[key] === value;
                  });
                });
              }
              
              return {
                sort: (sortObj) => {
                  if (sortObj.submittedAt === -1) {
                    results.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
                  }
                  return {
                    toArray: () => results,
                    limit: (num) => {
                      return {
                        toArray: () => results.slice(0, num),
                        next: () => results.length > 0 ? results[0] : null
                      };
                    },
                    next: () => results.length > 0 ? results[0] : null
                  };
                },
                toArray: () => results,
                limit: (num) => {
                  return {
                    toArray: () => results.slice(0, num),
                    next: () => results.length > 0 ? results[0] : null
                  };
                },
                next: () => results.length > 0 ? results[0] : null
              };
            },
            findOne: (query = {}) => {
              const results = collections.get(name) || [];
              if (Object.keys(query).length === 0) {
                return results.length > 0 ? results[0] : null;
              }
              
              return results.find(doc => {
                return Object.entries(query).every(([key, value]) => {
                  if (key === '$or') {
                    // Handle $or queries
                    return value.some(orCondition => {
                      return Object.entries(orCondition).every(([orKey, orValue]) => {
                        if (orKey === 'phone' || orKey === 'email') {
                          return doc[orKey] === orValue;
                        }
                        return doc[orKey] === orValue;
                      });
                    });
                  }
                  return doc[key] === value;
                });
              }) || null;
            },
            insertOne: (doc) => {
              const coll = collections.get(name) || [];
              coll.push(doc);
              collections.set(name, coll);
              return Promise.resolve({ insertedId: doc._id });
            },
            updateOne: async (filter, update) => {
              const coll = collections.get(name) || [];
              const index = coll.findIndex(doc => {
                return Object.entries(filter).every(([key, value]) => {
                  return doc[key] === value;
                });
              });
              
              if (index !== -1) {
                // Apply the update operations
                if (update.$set) {
                  Object.assign(coll[index], update.$set);
                }
                if (update.$unset) {
                  Object.keys(update.$unset).forEach(key => {
                    delete coll[index][key];
                  });
                }
              }
              collections.set(name, coll);
              return Promise.resolve({ modifiedCount: index !== -1 ? 1 : 0 });
            },
            findOneAndUpdate: async (filter, update, options) => {
              const coll = collections.get(name) || [];
              const index = coll.findIndex(doc => {
                return Object.entries(filter).every(([key, value]) => {
                  return doc[key] === value;
                });
              });
              
              let result = null;
              if (index !== -1) {
                // Apply the update operations
                if (update.$set) {
                  Object.assign(coll[index], update.$set);
                }
                if (update.$unset) {
                  Object.keys(update.$unset).forEach(key => {
                    delete coll[index][key];
                  });
                }
                
                result = { value: coll[index] };
              }
              
              collections.set(name, coll);
              return Promise.resolve(result);
            }
          };
        }
      };
      
      client = { close: () => {} }; // Mock client
      console.log("✅ In-memory database initialized for development");
    }
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("algoforce");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("⚠️  Using in-memory storage for development. Data will be lost when server stops.");
    
    // Create a simple in-memory database for development
    const collections = new Map();
    
    db = {
      collection: (name) => {
        if (!collections.has(name)) {
          collections.set(name, []);
        }
        
        return {
          find: (query = {}) => {
            let results = collections.get(name);
            
            // Simple query matching
            if (Object.keys(query).length > 0) {
              results = results.filter(doc => {
                return Object.entries(query).every(([key, value]) => {
                  if (key === '$or') {
                    // Handle $or queries
                    return value.some(orCondition => {
                      return Object.entries(orCondition).every(([orKey, orValue]) => {
                        if (orKey === 'phone' || orKey === 'email') {
                          return doc[orKey] === orValue;
                        }
                        return doc[orKey] === orValue;
                      });
                    });
                  }
                  return doc[key] === value;
                });
              });
            }
            
            return {
              sort: (sortObj) => {
                if (sortObj.submittedAt === -1) {
                  results.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
                }
                return {
                  toArray: () => results,
                  limit: (num) => {
                    return {
                      toArray: () => results.slice(0, num),
                      next: () => results.length > 0 ? results[0] : null
                    };
                  },
                  next: () => results.length > 0 ? results[0] : null
                };
              },
              toArray: () => results,
              limit: (num) => {
                return {
                  toArray: () => results.slice(0, num),
                  next: () => results.length > 0 ? results[0] : null
                };
              },
              next: () => results.length > 0 ? results[0] : null
            };
          },
          findOne: (query = {}) => {
            const results = collections.get(name) || [];
            if (Object.keys(query).length === 0) {
              return results.length > 0 ? results[0] : null;
            }
            
            return results.find(doc => {
              return Object.entries(query).every(([key, value]) => {
                if (key === '$or') {
                  // Handle $or queries
                  return value.some(orCondition => {
                    return Object.entries(orCondition).every(([orKey, orValue]) => {
                      if (orKey === 'phone' || orKey === 'email') {
                        return doc[orKey] === orValue;
                      }
                      return doc[orKey] === orValue;
                    });
                  });
                }
                return doc[key] === value;
              });
            }) || null;
          },
          insertOne: (doc) => {
            const coll = collections.get(name) || [];
            coll.push(doc);
            collections.set(name, coll);
            return Promise.resolve({ insertedId: doc._id });
          },
          updateOne: async (filter, update) => {
            const coll = collections.get(name) || [];
            const index = coll.findIndex(doc => {
              return Object.entries(filter).every(([key, value]) => {
                return doc[key] === value;
              });
            });
            
            if (index !== -1) {
              // Apply the update operations
              if (update.$set) {
                Object.assign(coll[index], update.$set);
              }
              if (update.$unset) {
                Object.keys(update.$unset).forEach(key => {
                  delete coll[index][key];
                });
              }
            }
            collections.set(name, coll);
            return Promise.resolve({ modifiedCount: index !== -1 ? 1 : 0 });
          },
          findOneAndUpdate: async (filter, update, options) => {
            const coll = collections.get(name) || [];
            const index = coll.findIndex(doc => {
              return Object.entries(filter).every(([key, value]) => {
                return doc[key] === value;
              });
            });
            
            let result = null;
            if (index !== -1) {
              // Apply the update operations
              if (update.$set) {
                Object.assign(coll[index], update.$set);
              }
              if (update.$unset) {
                Object.keys(update.$unset).forEach(key => {
                  delete coll[index][key];
                });
              }
              
              result = { value: coll[index] };
            }
            
            collections.set(name, coll);
            return Promise.resolve(result);
          }
        };
      }
    };
    
    client = { close: () => {} }; // Mock client
    console.log("✅ In-memory database initialized for development");
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("❌ Database not initialized");
  }
  return db;
};

export const closeDB = async () => {
  await client.close();
};
